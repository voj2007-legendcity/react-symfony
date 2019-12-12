<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductPriceTypeRepository")
 */
class ProductPriceType
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProductPrice", mappedBy="price_type")
     */
    private $productPrices;


    public function __construct()
    {
        $this->productPrices = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    // /**
    //  * @return Collection|ProductPrice[]
    //  * @MaxDepth(1)
    //  */
    // public function getProductPrices(): Collection
    // {
    //     return $this->productPrices;
    // }

    // public function addProductPrice(ProductPrice $productPrice): self
    // {
    //     if (!$this->productPrices->contains($productPrice)) {
    //         $this->productPrices[] = $productPrice;
    //         $productPrice->setProduct($this);
    //     }

    //     return $this;
    // }

    // public function removeProductPrice(ProductPrice $productPrice): self
    // {
    //     if ($this->productPrices->contains($productPrice)) {
    //         $this->productPrices->removeElement($productPrice);
    //         // set the owning side to null (unless already changed)
    //         if ($productPrice->getProduct() === $this) {
    //             $productPrice->setProduct(null);
    //         }
    //     }

    //     return $this;
    // }

}
