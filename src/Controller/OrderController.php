<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\User;
use App\Entity\Orders;
use App\Entity\OrderStatus;
use App\Entity\OrderProduct;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use YandexCheckout\Client;

class OrderController extends AbstractController
{
  /** 
   * @Route("/api/order/add/{token}", methods={"POST"}, name="order_add", requirements={"token"="\S+"})
   */
  public function addOrder(Request $request, UserPasswordEncoderInterface $passwordEncoder, ValidatorInterface $validator, \Swift_Mailer $mailer, string $token)
  {

    // $message = (new \Swift_Message('Hello Email'))
    //     ->setFrom('developer.voj@yandex.ru')
    //     ->setTo('softkorp.linux@yandex.ru')
    //     ->setBody(
    //         $this->renderView(
    //             'emails/order.html.twig',
    //             ['name' => 'test']
    //         ),
    //         'text/html'
    //     )
    // ;

    // $mailer->send($message);

    // throw $this->createNotFoundException('Order are not available');

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
        $temporaryPassword = null;
        $entityManager = $this->getDoctrine()->getManager();
        $user = $this->getDoctrine()
          ->getRepository(User::class)
          ->findOneBy(['email' => $request->request->get('email')]);

        if(!$user){
          $temporaryPassword = uniqid();
          $user = new User();
          $user->setName($request->request->get('name'));
          $user->setEmail($request->request->get('email'));
          $user->setPhone($request->request->get('phone'));
          $user->setRoles(['ROLE_USER']);
          $user->setPassword($passwordEncoder->encodePassword($user, $temporaryPassword));

          $violations = $validator->validate($user);
        
          if(count($violations) > 0){
            $errors = array();

            foreach ($violations as $violation) {
              $errors['message'] = $violation->getMessage();
            }
            $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
            $response->setData($errors);
            return $response;
          }
        }

        $orderStatus = $this->getDoctrine()
          ->getRepository(OrderStatus::class)
          ->findOneBy(['id' => 1]);
        
        $orders = new Orders();
        $orders->setUser($user);
        $orders->setPromoCode($cart->getPromoCode());
        $orders->setOrderStatus($orderStatus);
        $orders->setPaymentMethod($request->request->get('payment'));
        $orders->setMessage($request->request->get('message'));

        $entityManager->persist($user);
        $entityManager->persist($orders);
        $entityManager->flush();

        foreach($cart->getCartProducts()->getValues() as $cartProduct){
          $orderProduct = new OrderProduct();
          $orderProduct->setOrders($orders);
          $orderProduct->setProductPrice($cartProduct->getProductPrice());

          $entityManager->persist($orderProduct);
          $entityManager->remove($cartProduct);
          $entityManager->flush();
        }

        $entityManager->remove($cart);
        $entityManager->flush();

        $data['success'] = true;
        $data['modal'] = true;
        $data['message'] = 'Спасибо что вы выбрали нашу школу.';

        $message = (new \Swift_Message('Заказ на сайте ' . $request->getHttpHost()))
          ->setFrom('developer.voj@yandex.ru')
          ->setTo($request->request->get('email'))
          ->setBody(
            $this->renderView(
              'emails/order.html.twig',
              [
                'name' => $request->request->get('name'),
                'phone' => $request->request->get('phone'),
                'host' => $request->getHttpHost()
              ]
            ),
            'text/html'
          );

        $mailer->send($message);
      }
      $response->setData($data);
      return $response;
    }
    throw $this->createNotFoundException('Order are not available');
  }
}
