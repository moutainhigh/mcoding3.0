DROP TABLE
IF EXISTS `T_BASE_GENERATE_CODE`;

CREATE TABLE `T_BASE_GENERATE_CODE` (
	`ID` VARCHAR (32) NOT NULL COMMENT '主键',
	`NAME` VARCHAR (255) NOT NULL COMMENT '名称',
	`TARGET_CODE` VARCHAR (255) NOT NULL COMMENT '目标',
	`STRATEGY` VARCHAR (255) DEFAULT '' COMMENT '生成策略:自增策略auto_increment',
	`PREFIX` VARCHAR (255) DEFAULT NULL COMMENT '前缀',
	`SUFFIX` VARCHAR (255) DEFAULT NULL COMMENT '后缀',
	`CURRENT_CODE` VARCHAR (255) DEFAULT NULL COMMENT '生成的下一个号码',
	`START_CODE` VARCHAR (255) DEFAULT NULL COMMENT '开始的号码',
	`MAX_CODE` VARCHAR (255) DEFAULT NULL COMMENT '最大的值',
	`CREATE_TIME` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`UPDATE_TIME` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
	PRIMARY KEY (`ID`)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = '编码生成规则';

INSERT INTO `els_huayang`.`T_BASE_GENERATE_CODE` (
	`PREFIX`,
	`SUFFIX`,
	`START_CODE`,
	`STRATEGY`,
	`MAX_CODE`,
	`CREATE_TIME`,
	`UPDATE_TIME`,
	`CURRENT_CODE`,
	`NAME`,
	`ID`,
	`TARGET_CODE`
)
VALUES
	(
		NULL,
		NULL,
		'50000000',
		'com.els.base.codegenerator.service.impl.AutoIncrementStrategy',
		NULL,
		'2017-06-20 23:20:53',
		'2017-06-20 23:30:24',
		NULL,
		'生成企业编码',
		'20170620113016-983abd8161254d408',
		'COMPANY_CODE_GENERATOR'
	);