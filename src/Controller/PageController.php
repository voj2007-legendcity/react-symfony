<?php

namespace App\Controller;

use App\Entity\Page;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;

class PageController extends AbstractController
{
  /**
   * @Route("/api/page/{pageId}", methods={"GET","HEAD"}, name="show_page", requirements={"pageId"="\D+"})
   */
  public function show(Request $request, string $pageId)
  {
    if($request->isXmlHttpRequest()){
      $data = array();
      $response = new JsonResponse();
      $page = $this->getDoctrine()
        ->getRepository(Page::class)
        ->findOneBy(['alias' => $pageId]);

      if(!$page){
        $data['message'] = 'Page are not available';
        $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
      }else{
        $encoder = new JsonEncoder();
        $defaultContext = [
          AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
            return $object->getId();
          },
        ];
        $normalizer = new ObjectNormalizer(null, null, null, null, null, null, $defaultContext);
        $serializer = new Serializer([$normalizer], [$encoder]);

        $fields = array(
          'longtitle',
          'description',
          'keywords',
          'pageBlocks'
        );
        $attributes = ($request->query->get('fields') !== null) ? array_merge($request->query->get('fields'), $fields) : $fields;

        $data = $serializer->normalize($page, null, [
          'enable_max_depth' => true,
          'attributes' => $attributes
        ]);
      }
      $response->setData($data);
      return $response;
    }
    throw $this->createNotFoundException('Page are not available');
  }
}
