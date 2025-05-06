DROP TABLE qa_credits;

CREATE SEQUENCE credits_id_seq;

CREATE TABLE qa_credits (
  id INTEGER PRIMARY KEY DEFAULT nextval('credits_id_seq'),
  clerk_id VARCHAR(32) NOT NULL, -- 用户Id
  order_number VARCHAR(64) DEFAULT '0', -- 订单号
  credit_amount INTEGER DEFAULT 0, -- 积分数量
  credit_type CHAR(1), -- 积分获得类型，如：0 赠送积分，1 订阅积分，2 充值积分，3 退款
  credit_transaction_type CHAR(1),  -- 交易类型，如：0 消费积分，1 获得积分，2 退款
  credit_desc VARCHAR(256), -- 积分描述
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 创建时间
);