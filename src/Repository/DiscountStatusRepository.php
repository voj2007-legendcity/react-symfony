<?php

namespace App\Repository;

use App\Entity\DiscountStatus;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method DiscountStatus|null find($id, $lockMode = null, $lockVersion = null)
 * @method DiscountStatus|null findOneBy(array $criteria, array $orderBy = null)
 * @method DiscountStatus[]    findAll()
 * @method DiscountStatus[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DiscountStatusRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, DiscountStatus::class);
    }

    // /**
    //  * @return DiscountStatus[] Returns an array of DiscountStatus objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DiscountStatus
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
