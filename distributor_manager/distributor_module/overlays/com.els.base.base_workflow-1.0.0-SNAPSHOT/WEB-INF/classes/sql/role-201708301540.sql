ALTER TABLE T_BASE_ROLE  ADD "COMPANY_ID" VARCHAR2(32);

ALTER TABLE T_BASE_ROLE ADD PRIMARY KEY("ID");

UPDATE T_BASE_ROLE SET PROJECT_ID = '6';