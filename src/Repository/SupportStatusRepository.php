<?php

namespace App\Repository;

use App\Entity\SupportStatus;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method SupportStatus|null find($id, $lockMode = null, $lockVersion = null)
 * @method SupportStatus|null findOneBy(array $criteria, array $orderBy = null)
 * @method SupportStatus[]    findAll()
 * @method SupportStatus[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SupportStatusRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, SupportStatus::class);
    }

    // /**
    //  * @return SupportStatus[] Returns an array of SupportStatus objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?SupportStatus
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
