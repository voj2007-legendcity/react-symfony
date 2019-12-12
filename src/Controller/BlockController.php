<?php

namespace App\Controller;

use App\Entity\Block;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalize;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;

use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;

class BlockController extends AbstractController
{
  /**
   * @Route("/api/block/{blockId}/entity/collection", methods={"GET","HEAD"}, name="show_block_entity_collection", requirements={"blockId"="\D+"})
   */
  public function showEntityCollection(Request $request, string $blockId)
  {
    if($request->isXmlHttpRequest()){
      $data = array();
      $response = new JsonResponse();
      $block = $this->getDoctrine()
        ->getRepository(Block::class)
        ->findOneBy(['blockId' => $blockId]);

      if(!$block){
        $data['message'] = 'Block are not available';
        $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
      }else{
        $collections = json_decode($block->getFieldCollection());
        $data = array(
          'name' => $block->getName(),
          'introtext' => $block->getIntrotext(),
          'content' => $block->getContent(),
          'image' => $block->getImage(),
        );

        foreach($collections as $collection){
          $class = '\\App\\Entity\\'.$collection->entity->name;
          $entity = $this->getDoctrine()
          ->getRepository($class)
          ->find($collection->entity->value);
          
          if(!$entity) {
            $data['message'] = 'Entity are not available';
            $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
          }else{
            $method = 'get'. ucfirst($request->query->get('entity'));
            
            if(!is_callable([$entity, $method]) || !is_callable([$entity->$method(), 'getValues'])){
              $data['message'] = 'Method are not available';
              $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
            }else{
              $productsData = array();

              foreach($entity->$method()->getValues() as $product){
                $fields = array();
                
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
                      $fields[$field] = $methodData;
                    }else{
                      $fields[$field] = $product->$method();
                    }
                  }
                }
                $data['fieldCollection'][] = $fields;
              }
            }
          }
        }
      }
      $response->setData($data);
      return $response;
    }
    throw $this->createNotFoundException('Block are not available');
  }

  /**
   * @Route("/api/block/{blockId}", methods={"GET","HEAD"}, name="show_block", requirements={"blockId"="\D+"})
   */
  public function show(Request $request, string $blockId)
  {
    if($request->isXmlHttpRequest()){
      $data = array();
      $response = new JsonResponse();
      $block = $this->getDoctrine()
        ->getRepository(Block::class)
        ->findOneBy(['blockId' => $blockId]);

      if(!$block){
        $data['message'] = 'Block are not available';
        $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
      }else{
        $data = array(
          'name' => $block->getName(),
          'introtext' => $block->getIntrotext(),
          'content' => $block->getContent(),
          'image' => $block->getImage(),
          'fieldCollection' => $block->getFieldCollection(),
        );
      }
      $response->setData($data);
      return $response;
    }
    throw $this->createNotFoundException('Block are not available');
  }
}
