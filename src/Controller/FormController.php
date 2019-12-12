<?php

namespace App\Controller;

use App\Entity\Subscribe;
use App\Entity\Support;
use App\Entity\SupportStatus;
use App\Entity\Discount;
use App\Entity\DiscountStatus;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FormController extends AbstractController
{

  /**
   * @Route("/api/form/subscribe", name="form_subscribe", methods={"POST"})
   */
  public function subscribe(Request $request, ValidatorInterface $validator)
  {
    if($request->isXmlHttpRequest()){
      $response = new JsonResponse();
      $data = $request->getContent();
      $data = json_decode($data, true);

      if(isset($data['subscribe'])){
        $entityManager = $this->getDoctrine()->getManager();
  
        $entity = new Subscribe();
        $entity->setEmail($data['subscribe']);
        $entity->setCreated(new \DateTime());
        
        $violations = $validator->validate($entity);
        
        if(count($violations) > 0){
          $errors = array();

          foreach ($violations as $violation) {
            $errors['message'] = $violation->getMessage();
          }
          $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
          $response->setData($errors);
        }else{
          $entityManager->persist($entity);
          $entityManager->flush();
  
          $response->setStatusCode(JsonResponse::HTTP_OK);
          $response->setData(array(
            'modal' => true,
            'message' => 'Эл. почта добавлена'
          ));
        }
        return $response;
      }
    }
    throw $this->createNotFoundException('Form are not available');
  }

  /**
   * @Route("/api/form/support", name="form_support", methods={"POST"})
   */
  public function support(Request $request, ValidatorInterface $validator)
  {
    if($request->isXmlHttpRequest()){
      $file = null;
      $response = new JsonResponse();
      $entityManager = $this->getDoctrine()->getManager();

      $entity = new Support();
      $entity->setName($request->request->get('name'));
      $entity->setEmail($request->request->get('email'));
      $entity->setMessage($request->request->get('message'));
      $entity->setCreated(new \DateTime());

      if($request->files->get('filename')){
        $file = $request->files->get('filename');
        $entity->setFile($file);
      }
      
      $violations = $validator->validate($entity);
      
      if(count($violations) > 0){
        $errors = array();

        foreach ($violations as $violation) {
          $errors['message'] = $violation->getMessage();
        }
        $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
        $response->setData($errors);
      }else{
        $status = $this->getDoctrine()
          ->getRepository(SupportStatus::class)
          ->findOneBy(['id' => 1]);
        
        $entity->setStatus($status);

        if($file){
          $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
          $newFilename = uniqid().'.'.$file->guessExtension();

          try {
            $file->move(
              $this->getParameter('support_directory'),
              $newFilename
            );
          } catch (FileException $e) {
            $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
          }
          $entity->setFile('/uploads/support/'.$newFilename);
        }

        $entityManager->persist($entity);
        $entityManager->flush();

        $response->setStatusCode(JsonResponse::HTTP_OK);
        $response->setData(array(
          'modal' => true,
          'message' => 'Сообщение отправлено.'
        ));
      }
      return $response;
    }
    throw $this->createNotFoundException('Form are not available');
  }

  /**
   * @Route("/api/form/discount", name="form_discount", methods={"POST"})
   */
  public function discount(Request $request, ValidatorInterface $validator)
  {
    if($request->isXmlHttpRequest()){
      $file = null;
      $response = new JsonResponse();
      $entityManager = $this->getDoctrine()->getManager();

      $entity = new Discount();
      $entity->setName($request->request->get('name'));
      $entity->setPhone($request->request->get('phone'));
      $entity->setEmail($request->request->get('email'));
      $entity->setCreated(new \DateTime());

      if($request->files->get('filename')){
        $file = $request->files->get('filename');
        $entity->setFile($file);
      }
      
      $violations = $validator->validate($entity);
      
      if(count($violations) > 0){
        $errors = array();

        foreach ($violations as $violation) {
          $errors['message'] = $violation->getMessage();
        }
        $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
        $response->setData($errors);
      }else{
        $status = $this->getDoctrine()
          ->getRepository(DiscountStatus::class)
          ->findOneBy(['id' => 1]);
        
        $entity->setStatus($status);

        if($file){
          $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
          $newFilename = uniqid().'.'.$file->guessExtension();

          try {
            $file->move(
              $this->getParameter('discount_directory'),
              $newFilename
            );
          } catch (FileException $e) {
            $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
          }
          $entity->setFile('/uploads/discount/'.$newFilename);
        }

        $entityManager->persist($entity);
        $entityManager->flush();

        $response->setStatusCode(JsonResponse::HTTP_OK);
        $response->setData(array(
          'modal' => true,
          'message' => 'Сообщение отправлено.'
        ));
      }
      return $response;
    }
    throw $this->createNotFoundException('Form are not available');
  }

}
