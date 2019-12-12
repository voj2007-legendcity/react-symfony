<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductPromoCodeRepository")
 */
class ProductPromoCode
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\PromoCode", inversedBy="productPromoCodes")
     * @ORM\JoinColumn(nullable=false)
     */
    private $promo_code;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Product", inversedBy="productPromoCodes")
     * @ORM\JoinColumn(nullable=false)
     */
    private $product;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPromoCode(): ?PromoCode
    {
        return $this->promo_code;
    }

    public function setPromoCode(?PromoCode $promo_code): self
    {
        $this->promo_code = $promo_code;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }
}
