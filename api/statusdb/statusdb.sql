CREATE TABLE IF NOT EXISTS `ministatus`.`status` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(40) NOT NULL,
    `status` VARCHAR(1024) NOT NULL,
    `timestamp` VARCHAR(15) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB;