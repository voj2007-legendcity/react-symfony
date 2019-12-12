<?php

namespace App\Repository;

use App\Entity\ProductPromoCode;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ProductPromoCode|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductPromoCode|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductPromoCode[]    findAll()
 * @method ProductPromoCode[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductPromoCodeRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ProductPromoCode::class);
    }

    // /**
    //  * @return ProductPromoCode[] Returns an array of ProductPromoCode objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ProductPromoCode
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
