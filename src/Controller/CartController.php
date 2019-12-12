<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\PromoCode;
use App\Entity\CartProduct;
use App\Entity\ProductPrice;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;

class CartController extends AbstractController
{

  /**
   * @Route("/api/cart", name="cart")
   */
  public function index()
  {
    return $this->render('cart/index.html.twig', [
      'controller_name' => 'CartController',
    ]);
  }

  /** 
   * @Route("/api/cart/product/add", methods={"POST"}, name="product_add")
   */
  public function addProduct(Request $request)
  {
    if($request->isXmlHttpRequest()){
      $data = array();
      $response = new JsonResponse();
      $token = $request->request->get('token');
      $productPriceId = $request->request->get('id');
      $productPrice = $this->getDoctrine()
        ->getRepository(ProductPrice::class)
        ->findOneBy(['id' => $productPriceId]);

      if(!$productPrice){
        $data['message'] = 'Product are not available';
        $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
      }else{
        $entityManager = $this->getDoctrine()->getManager();

        if((bool)$token !== false){
          $cart = $this->getDoctrine()
            ->getRepository(Cart::class)
            ->findOneBy(['token' => $token]);
        }else{
          $id = (time() * rand()) . uniqid();
          $token = md5($id);
          $cart = new Cart();
          $cart->setToken($token);
          $entityManager->persist($cart);
          $entityManager->flush();
        }

        $cartProduct = new CartProduct();
        $cartProduct->setCart($cart);
        $cartProduct->setProductPrice($productPrice);

        $entityManager->persist($cartProduct);
        $entityManager->flush();

        $data = $this->getPruductsListInCart($cart, $token);
        $data['token'] = $token;
        $data['success'] = true;
        $data['modal'] = true;
        $data['message'] = 'Курс был успешно добавлен в корзину.';
      }
      $response->setData($data);
      return $response;
    }
    throw $this->createNotFoundException('Product are not available');
  }

  /** 
   * @Route("/api/cart/promocode/add/{token}", methods={"POST"}, name="promocode_add", requirements={"token"="\S+"})
   */
  public function addPromocode(Request $request, string $token)
  {
    if($request->isXmlHttpRequest()){
      $promocode = $request->request->get('promocode');
      $data = array();
      $response = new JsonResponse();
      $cart = $this->getDoctrine()
        ->getRepository(Cart::class)
        ->findOneBy(['token' => $token]);

      if(!$cart){
        $data['message'] = 'Cart are not available';
        $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
      }else{
        $promocodeEntity = $this->getDoctrine()
        ->getRepository(PromoCode::class)
        ->findOneBy(['name' => $promocode]);

        if(!$promocodeEntity){
          $data['message'] = 'Промокод не действительный';
          $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
        }else{
          $entityManager = $this->getDoctrine()->getManager();
          $cart->setPromoCode($promocodeEntity);
          $entityManager->persist($cart);
          $entityManager->flush();
  
          $data = $this->getPruductsListInCart($cart, $token);
          $data['success'] = true;
          $data['modal'] = true;
          $data['message'] = 'Промокод активирован.';
        }
      }
      $response->setData($data);
      return $response;
    }
    throw $this->createNotFoundException('Cart are not available');
  }

  /**
   * @Route("/api/cart/promocode/delete/{token}", methods={"DELETE"}, name="promocode_delete", requirements={"token"="\S+"})
   */
  public function deletePromocode(Request $request, string $token)
  {
    if($request->isXmlHttpRequest()){
      $data = array();
      $response = new JsonResponse();
      $cart = $this->getDoctrine()
        ->getRepository(Cart::class)
        ->findOneBy(['token' => $token]);

      if(!$cart){
        $data['message'] = 'Cart are not available';
        $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
      }else{
        $entityManager = $this->getDoctrine()->getManager();
        $cart->setPromoCode(null);
        $entityManager->persist($cart);
        $entityManager->flush();

        $data = $this->getPruductsListInCart($cart, $token);
        $data['success'] = true;
        $data['modal'] = true;
        $data['message'] = 'Промокод успешно удален.';
      }
      $response->setData($data);
      return $response;
    }
    throw $this->createNotFoundException('Cart are not available');
  }

  /**
   * @Route("/api/cart/product/delete/{token}/{id}", methods={"DELETE"}, name="product_delete", requirements={"token"="\S+","id"="\d+"})
   */
  public function deleteProduct(Request $request, string $token, string $id)
  {
    if($request->isXmlHttpRequest()){
      $data = array();
      $response = new JsonResponse();
      $cart = $this->getDoctrine()
        ->getRepository(Cart::class)
        ->findOneBy(['token' => $token]);

      if(!$cart){
        $data['message'] = 'Cart are not available';
        $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
      }else{
        $cartProduct = $this->getDoctrine()
        ->getRepository(CartProduct::class)
        ->findOneBy(['id' => $id]);

        if(!$cart){
          $cartProduct['message'] = 'Product are not available';
          $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
        }else{
          $entityManager = $this->getDoctrine()->getManager();
          $entityManager->remove($cartProduct);
          $entityManager->flush();

          $data = $this->getPruductsListInCart($cart, $token);

          if(!empty($data)){
            $data['message'] = 'Товар был успешно удален из корзины.';
          }else{
            $entityManager->remove($cart);
            $entityManager->flush();

            $data['message'] = 'Ваша корзина пуста.';
            $data['removeToken'] = true;
          }

          $data['success'] = true;
          $data['modal'] = true;
        }
      }
      $response->setData($data);
      return $response;
    }
    throw $this->createNotFoundException('Cart are not available');
  }

  /**
   * @Route("/api/cart/{token}", methods={"GET","HEAD"}, name="show_cart")
   */
  public function show(Request $request, string $token)
  {
    if($request->isXmlHttpRequest()){
      $data = array();
      $response = new JsonResponse();
      $cart = $this->getDoctrine()
        ->getRepository(Cart::class)
        ->findOneBy(['token' => $token]);

      if(!$cart){
        $data['message'] = 'Cart are not available' . $token;
        $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
      }else{
        $data = $this->getPruductsListInCart($cart, $token);
      }
      $response->setData($data);
      return $response;
    }
    throw $this->createNotFoundException('Cart are not available');
  }

  /**
   * @return array
   */
  private function getPruductsListInCart(Cart $cart, string $token){
    $data = array();
    $products = array();
    $cartProducts = $cart->getCartProducts()->getValues();

    if($cartProducts){
      $total = 0;
      $discount = 0;
      $promoCodeName = null;
      $cartPromoCode = $cart->getPromoCode();

      if($cartPromoCode){
        $promoCodeName = $cartPromoCode->getName();
      }
      
      foreach($cartProducts as $item){
        $newPrice = null;
        $productPrice = $item->getProductPrice();
        $price = $productPrice->getPrice();
        $product = $productPrice->getProduct();
        $promoCode = $productPrice->getPromoCode();

        if($promoCode){
          if($promoCode->getName() === $promoCodeName){
            $newPrice = $price - ($price / 100 * $promoCode->getDiscount());
            $discount += $price - $newPrice;
          }
        }

        $total += $newPrice ? $newPrice : $price;

        $products[] = array(
          'id'=>$item->getId(),
          'name'=>$product->getName(),
          'duration'=>$product->getDuration(),
          'description'=>$productPrice->getPriceType()->getName(),
          'price'=>$price,
          'newPrice'=>$newPrice
        );
      }
      $data['token'] = $token;
      $data['total'] = $total;
      $data['discount'] = $discount;
      $data['promoCode'] = $promoCodeName;
      $data['products'] = $products;
    }
    return $data;
  }

}
