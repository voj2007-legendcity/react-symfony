<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductPriceRepository")
 */
class ProductPrice
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $price;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ProductPriceType", inversedBy="productPrices")
     * @ORM\JoinColumn(nullable=false)
     */
    private $price_type;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Product", inversedBy="productPrices")
     * @ORM\JoinColumn(nullable=false)
     */
    private $product;

    // /**
    //  * @ORM\OneToMany(targetEntity="App\Entity\CartProduct", mappedBy="product_price")
    //  */
    // private $cartProducts;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\PromoCode", inversedBy="productPrices")
     */
    private $promo_code;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\OrderProduct", mappedBy="product_price")
     */
    private $orderProducts;



    public function __construct()
    {
        $this->cartProducts = new ArrayCollection();
        $this->orderProducts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getPriceType(): ?ProductPriceType
    {
        return $this->price_type;
    }

    public function setPriceType(?ProductPriceType $price_type): self
    {
        $this->price_type = $price_type;

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

    // /**
    //  * @return Collection|CartProduct[]
    //  */
    // public function getCartProducts(): Collection
    // {
    //     return $this->cartProducts;
    // }

    // public function addCartProduct(CartProduct $cartProduct): self
    // {
    //     if (!$this->cartProducts->contains($cartProduct)) {
    //         $this->cartProducts[] = $cartProduct;
    //         $cartProduct->setProductPrice($this);
    //     }

    //     return $this;
    // }

    // public function removeCartProduct(CartProduct $cartProduct): self
    // {
    //     if ($this->cartProducts->contains($cartProduct)) {
    //         $this->cartProducts->removeElement($cartProduct);
    //         // set the owning side to null (unless already changed)
    //         if ($cartProduct->getProductPrice() === $this) {
    //             $cartProduct->setProductPrice(null);
    //         }
    //     }

    //     return $this;
    // }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
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

    /**
     * @return Collection|OrderProduct[]
     */
    public function getOrderProducts(): Collection
    {
        return $this->orderProducts;
    }

    public function addOrderProduct(OrderProduct $orderProduct): self
    {
        if (!$this->orderProducts->contains($orderProduct)) {
            $this->orderProducts[] = $orderProduct;
            $orderProduct->setProductPrice($this);
        }

        return $this;
    }

    public function removeOrderProduct(OrderProduct $orderProduct): self
    {
        if ($this->orderProducts->contains($orderProduct)) {
            $this->orderProducts->removeElement($orderProduct);
            // set the owning side to null (unless already changed)
            if ($orderProduct->getProductPrice() === $this) {
                $orderProduct->setProductPrice(null);
            }
        }

        return $this;
    }

   
}
