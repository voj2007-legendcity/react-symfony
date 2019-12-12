<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190903091857 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE page_block (id INT AUTO_INCREMENT NOT NULL, page_id INT NOT NULL, block_id INT NOT NULL, position INT DEFAULT NULL, INDEX IDX_E59A68F4C4663E4 (page_id), INDEX IDX_E59A68F4E9ED820C (block_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE page (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, longtitle VARCHAR(255) DEFAULT NULL, description LONGTEXT DEFAULT NULL, keywords VARCHAR(255) DEFAULT NULL, alias VARCHAR(255) NOT NULL, introtext LONGTEXT DEFAULT NULL, content LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE page_block ADD CONSTRAINT FK_E59A68F4C4663E4 FOREIGN KEY (page_id) REFERENCES page (id)');
        $this->addSql('ALTER TABLE page_block ADD CONSTRAINT FK_E59A68F4E9ED820C FOREIGN KEY (block_id) REFERENCES block (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE page_block DROP FOREIGN KEY FK_E59A68F4C4663E4');
        $this->addSql('DROP TABLE page_block');
        $this->addSql('DROP TABLE page');
    }
}
