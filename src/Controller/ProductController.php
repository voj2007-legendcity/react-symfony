<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\ProductCategory;
use App\Entity\ProductPrice;
use App\Entity\ProductPriceType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;

class ProductController extends AbstractController
{
  /**
   * @Route("/api/product/{alias}", methods={"GET","HEAD"}, name="show_product", requirements={"alias"="\D+"})
   */
  public function show(Request $request, string $alias)
  {
    if($request->isXmlHttpRequest()){
      $data = array();
      $response = new JsonResponse();
      $product = $this->getDoctrine()
        ->getRepository(Product::class)
        ->findOneBy(['alias' => $alias]);

      if(!$product){
        $data['message'] = 'Product are not available';
        $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
      }else{
        foreach($request->query->get('fields') as $field){
          $method = 'get'. ucfirst($field);

          if(is_callable([$product, $method])){
            if(is_callable([$product->$method(), 'getValues'])){
              $serializer = new Serializer([new ObjectNormalizer()]);
              $methodData = $serializer->normalize($product->$method()->getValues(), null, [
                'attributes' => [
                  'id',
                  'price', 
                  'priceType'
                ]
              ]);
              $data[$field] = $methodData;
            }else{
              $data[$field] = $product->$method();
            }
          }
        }
      }
      $response->setData($data);
      return $response;
    }
    throw $this->createNotFoundException('Product are not available');
  }
  
}
