<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BlockRepository")
 * @UniqueEntity("blockId", message = "Блок с таким ID {{ value }} уже используется")
 */
class Block
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
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $introtext;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $content;

    /**
     * @ORM\Column(type="json_array", nullable=true)
     */
    private $fieldCollection;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $image;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $blockId;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\PageBlock", mappedBy="block")
     */
    private $pageBlocks;


    public function __construct()
    {
        $this->pageBlocks = new ArrayCollection();
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

    public function getFieldCollection()
    {
        return $this->fieldCollection;
    }

    public function setFieldCollection($fieldCollection): self
    {
        $this->fieldCollection = $fieldCollection;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getBlockId(): ?string
    {
        return $this->blockId;
    }

    public function setBlockId(string $blockId): self
    {
        $this->blockId = $blockId;

        return $this;
    }

    // /**
    //  * @return Collection|PageBlock[]
    //  */
    // public function getPageBlocks(): Collection
    // {
    //     return $this->pageBlocks;
    // }

    // public function addPageBlock(PageBlock $pageBlock): self
    // {
    //     if (!$this->pageBlocks->contains($pageBlock)) {
    //         $this->pageBlocks[] = $pageBlock;
    //         $pageBlock->setBlock($this);
    //     }

    //     return $this;
    // }

    // public function removePageBlock(PageBlock $pageBlock): self
    // {
    //     if ($this->pageBlocks->contains($pageBlock)) {
    //         $this->pageBlocks->removeElement($pageBlock);
    //         // set the owning side to null (unless already changed)
    //         if ($pageBlock->getBlock() === $this) {
    //             $pageBlock->setBlock(null);
    //         }
    //     }

    //     return $this;
    // }

    
}
