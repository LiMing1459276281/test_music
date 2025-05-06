DROP TABLE qa_images;

CREATE SEQUENCE images_id_seq;

CREATE TABLE qa_images (
  id INTEGER PRIMARY KEY DEFAULT nextval('images_id_seq'),
  keys TEXT,
  imgurl VARCHAR(255),
  description TEXT,
  public CHAR(1) DEFAULT 1, -- 图像是否公开，如：1 公开，0 不公开
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip VARCHAR(48) -- IPv4, 最大长度为15个字符; IPv6, 最大长度为45个字符
);