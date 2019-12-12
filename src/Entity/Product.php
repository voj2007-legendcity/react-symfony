<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;


/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductRepository")
 * @UniqueEntity("alias", message = "Алиас с таким значением {{ value }} уже используется")
 */
class Product
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
     * @ORM\Column(type="text", nullable=true)
     */
    private $introtext;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $content;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $duration;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $salary;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $paymentConditions;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ProductCategory", inversedBy="products")
     * @ORM\JoinColumn(nullable=false)
     * @MaxDepth(1)
     */
    private $category;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProductPrice", mappedBy="product")
     * @MaxDepth(1)
     */
    private $productPrices;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProductFile", mappedBy="product")
     */
    private $productFiles;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProductPromoCode", mappedBy="product")
     */
    private $productPromoCodes;

    /**
     * @ORM\Column(type="boolean")
     */
    private $popular;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $alias;

    public function __construct()
    {
        $this->productPrices = new ArrayCollection();
        $this->productFiles = new ArrayCollection();
        $this->productPromoCodes = new ArrayCollection();
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

    public function getIntrotext(): ?string
    {
        return html_entity_decode($this->introtext);
    }

    public function setIntrotext(?string $introtext): self
    {
        $this->introtext = strip_tags(htmlentities(trim($introtext)));

        return $this;
    }

    public function getContent(): ?string
    {
        return html_entity_decode($this->content);
    }

    public function setContent(?string $content): self
    {
        $this->content = strip_tags(htmlentities(trim($content)));

        return $this;
    }

    public function getDuration(): ?string
    {
        return $this->duration;
    }

    public function setDuration(?string $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getSalary(): ?string
    {
        return $this->salary;
    }

    public function setSalary(?string $salary): self
    {
        $this->salary = $salary;

        return $this;
    }

    public function getPaymentConditions(): ?string
    {
        return $this->paymentConditions;
    }

    public function setPaymentConditions(?string $paymentConditions): self
    {
        $this->paymentConditions = $paymentConditions;

        return $this;
    }

    public function getCategory(): ?ProductCategory
    {
        return $this->category;
    }

    public function setCategory(?ProductCategory $category): self
    {
        $this->category = $category;

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
            $productPrice->setProduct($this);
        }

        return $this;
    }

    public function removeProductPrice(ProductPrice $productPrice): self
    {
        if ($this->productPrices->contains($productPrice)) {
            $this->productPrices->removeElement($productPrice);
            // set the owning side to null (unless already changed)
            if ($productPrice->getProduct() === $this) {
                $productPrice->setProduct(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ProductFile[]
     */
    public function getProductFiles(): Collection
    {
        return $this->productFiles;
    }

    public function addProductFile(ProductFile $productFile): self
    {
        if (!$this->productFiles->contains($productFile)) {
            $this->productFiles[] = $productFile;
            $productFile->setProduct($this);
        }

        return $this;
    }

    public function removeProductFile(ProductFile $productFile): self
    {
        if ($this->productFiles->contains($productFile)) {
            $this->productFiles->removeElement($productFile);
            // set the owning side to null (unless already changed)
            if ($productFile->getProduct() === $this) {
                $productFile->setProduct(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ProductPromoCode[]
     */
    public function getProductPromoCodes(): Collection
    {
        return $this->productPromoCodes;
    }

    public function addProductPromoCode(ProductPromoCode $productPromoCode): self
    {
        if (!$this->productPromoCodes->contains($productPromoCode)) {
            $this->productPromoCodes[] = $productPromoCode;
            $productPromoCode->setProduct($this);
        }

        return $this;
    }

    public function removeProductPromoCode(ProductPromoCode $productPromoCode): self
    {
        if ($this->productPromoCodes->contains($productPromoCode)) {
            $this->productPromoCodes->removeElement($productPromoCode);
            // set the owning side to null (unless already changed)
            if ($productPromoCode->getProduct() === $this) {
                $productPromoCode->setProduct(null);
            }
        }

        return $this;
    }

    public function getPopular(): ?bool
    {
        return $this->popular;
    }

    public function setPopular(bool $popular): self
    {
        $this->popular = $popular;

        return $this;
    }

    public function getAlias(): ?string
    {
        return $this->alias;
    }

    public function setAlias(string $alias): self
    {
        $this->alias = $alias;

        return $this;
    }

}
