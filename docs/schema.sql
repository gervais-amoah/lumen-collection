--- Ensure the pgvector extension is created
create extension if not exists vector;

-- products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  brand TEXT,
  price REAL,
  color TEXT[],
  size TEXT[],
  style TEXT[],
  material TEXT,
  occasion TEXT[],
  description TEXT NOT NULL,
  image_url TEXT,
  embedding VECTOR(256) NOT NULL
);

-- ⚠️ Run this AFTER inserting products
CREATE INDEX IF NOT EXISTS products_embedding_idx 
ON products 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Function to match products based on embedding similarity
CREATE OR REPLACE FUNCTION match_products(
  query_embedding vector(384),
  match_threshold float DEFAULT 0.3,
  match_count int DEFAULT 6
)
RETURNS TABLE (
  id text,
  category text,
  type text,
  name text,
  brand text,
  price real,
  color text[],
  size text[],
  style text[],
  material text,
  occasion text[],
  description text,
  image_url text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    products.id,
    products.category,
    products.type,
    products.name,
    products.brand,
    products.price,
    products.color,
    products.size,
    products.style,
    products.material,
    products.occasion,
    products.description,
    products.image_url,
    1 - (products.embedding <=> query_embedding) as similarity
  FROM products
  WHERE 1 - (products.embedding <=> query_embedding) > match_threshold
  ORDER BY products.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
