CREATE TABLE IF NOT EXISTS `ministory`.`story` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(40) NOT NULL,
    `filename` VARCHAR(40) NOT NULL,
    `timestamp` VARCHAR(15) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB;