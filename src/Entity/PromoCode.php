<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PromoCodeRepository")
 */
class PromoCode
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
     * @ORM\Column(type="integer")
     */
    private $discount;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProductPromoCode", mappedBy="promo_code")
     */
    private $productPromoCodes;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Cart", mappedBy="promoCode")
     */
    private $carts;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProductPrice", mappedBy="promo_code")
     */
    private $productPrices;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Orders", mappedBy="promo_code")
     */
    private $orders;


    public function __construct()
    {
        $this->productPromoCodes = new ArrayCollection();
        $this->carts = new ArrayCollection();
        $this->productPrices = new ArrayCollection();
        $this->orders = new ArrayCollection();
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

    public function getDiscount(): ?int
    {
        return $this->discount;
    }

    public function setDiscount(int $discount): self
    {
        $this->discount = $discount;

        return $this;
    }

    /**
     * @return Collection|ProductPrice[]
     */
    public function getProductPrices(): Collection
    {
        return $this->productPrices;
    }

    public function addProductPrice(ProductPrice $productPrice): self
    {
        if (!$this->productPrices->contains($productPrice)) {
            $this->productPrices[] = $productPrice;
            $productPrice->setPromoCode($this);
        }

        return $this;
    }

    public function removeProductPrice(ProductPrice $productPrice): self
    {
        if ($this->productPrices->contains($productPrice)) {
            $this->productPrices->removeElement($productPrice);
            // set the owning side to null (unless already changed)
            if ($productPrice->getPromoCode() === $this) {
                $productPrice->setPromoCode(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Orders[]
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Orders $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders[] = $order;
            $order->setPromoCode($this);
        }

        return $this;
    }

    public function removeOrder(Orders $order): self
    {
        if ($this->orders->contains($order)) {
            $this->orders->removeElement($order);
            // set the owning side to null (unless already changed)
            if ($order->getPromoCode() === $this) {
                $order->setPromoCode(null);
            }
        }

        return $this;
    }

    

    // /**
    //  * @return Collection|ProductPromoCode[]
    //  */
    // public function getProductPromoCodes(): Collection
    // {
    //     return $this->productPromoCodes;
    // }

    // public function addProductPromoCode(ProductPromoCode $productPromoCode): self
    // {
    //     if (!$this->productPromoCodes->contains($productPromoCode)) {
    //         $this->productPromoCodes[] = $productPromoCode;
    //         $productPromoCode->setPromoCode($this);
    //     }

    //     return $this;
    // }

    // public function removeProductPromoCode(ProductPromoCode $productPromoCode): self
    // {
    //     if ($this->productPromoCodes->contains($productPromoCode)) {
    //         $this->productPromoCodes->removeElement($productPromoCode);
    //         // set the owning side to null (unless already changed)
    //         if ($productPromoCode->getPromoCode() === $this) {
    //             $productPromoCode->setPromoCode(null);
    //         }
    //     }

    //     return $this;
    // }

    // /**
    //  * @return Collection|Cart[]
    //  */
    // public function getCarts(): Collection
    // {
    //     return $this->carts;
    // }

    // public function addCart(Cart $cart): self
    // {
    //     if (!$this->carts->contains($cart)) {
    //         $this->carts[] = $cart;
    //         $cart->setPromoCode($this);
    //     }

    //     return $this;
    // }

    // public function removeCart(Cart $cart): self
    // {
    //     if ($this->carts->contains($cart)) {
    //         $this->carts->removeElement($cart);
    //         // set the owning side to null (unless already changed)
    //         if ($cart->getPromoCode() === $this) {
    //             $cart->setPromoCode(null);
    //         }
    //     }

    //     return $this;
    // }
}
