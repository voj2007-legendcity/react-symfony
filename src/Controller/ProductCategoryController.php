<?php

namespace App\Controller;

use App\Entity\ProductCategory;
use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class ProductCategoryController extends AbstractController
{
  /**
   * @Route("/api/category/{id}/products", methods={"GET","HEAD"}, name="show_category_products", requirements={"id"="\d+"})
   */
  public function showCategoryProducts(Request $request, int $id)
  {
    if($request->isXmlHttpRequest()){
      $category = $this->getDoctrine()
        ->getRepository(ProductCategory::class)
        ->find($id);

      if(!$category) {
        throw $category->createNotFoundException(
          'Category are not available'
        );
      }

      $serializer = new Serializer([new ObjectNormalizer()]);
      $products = $serializer->normalize($category->getProducts()->getValues(), null, [
        'attributes' => [
          'id', 
          'name',
          'introtext',
          'duration',
          'sallary',
          'payment_conditions'
        ]
      ]);
      return new JsonResponse($products);
    }
    throw $this->createNotFoundException('Category are not available');
  }
}
