<?php

namespace App\Controller;

use App\Entity\Settings;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class SettingsController extends AbstractController
{
  /**
   * @Route("/api/settings", name="settings", methods={"GET","HEAD"})
   */
  public function index(Request $request)
  {
    if($request->isXmlHttpRequest()){
      $settings = $this->getDoctrine()
        ->getRepository(Settings::class)
        ->find(1);

      if(!$settings){
        throw $this->createNotFoundException('Settings are not available');
      }

      return new JsonResponse(array(
        'tel' => $settings->getTel(),
        'cell' => $settings->getCell(),
        'email' => $settings->getEmail(),
        'inn' => $settings->getInn(),
        'ogrn' => $settings->getOgrn(),
        'logo' => $settings->getLogo(),
      ));
    }
    throw $this->createNotFoundException('Settings are not available');
  }
}
