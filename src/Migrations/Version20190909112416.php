<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190909112416 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE product_price ADD promo_code_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE product_price ADD CONSTRAINT FK_6B9459852FAE4625 FOREIGN KEY (promo_code_id) REFERENCES promo_code (id)');
        $this->addSql('CREATE INDEX IDX_6B9459852FAE4625 ON product_price (promo_code_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE product_price DROP FOREIGN KEY FK_6B9459852FAE4625');
        $this->addSql('DROP INDEX IDX_6B9459852FAE4625 ON product_price');
        $this->addSql('ALTER TABLE product_price DROP promo_code_id');
    }
}
