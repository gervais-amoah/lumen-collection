import { pipeline } from "@xenova/transformers";
import { EmbeddingPipeline } from "@/types/embeddings";

class EmbeddingService {
  private extractor: EmbeddingPipeline | null = null;

  async initialize(): Promise<EmbeddingPipeline> {
    if (!this.extractor) {
      this.extractor = (await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2"
      )) as EmbeddingPipeline;
    }
    return this.extractor;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const extractor = await this.initialize();

      // Clean and normalize text
      const cleanText = text.trim().toLowerCase();

      if (!cleanText) {
        return Array(384).fill(0);
      }

      // Generate embedding
      const result = await extractor(cleanText, {
        pooling: "mean",
        normalize: true,
      });

      // Convert to array - the result structure changed in v2.x
      const embedding = Array.from(result.data);

      console.log(
        `Generated embedding for "${cleanText}": ${embedding.length} dimensions`
      );
      return embedding;
    } catch (error) {
      console.error("Embedding generation error:", error);
      // Return zero vector as fallback
      return Array(384).fill(0);
    }
  }

  async generateEmbeddingMock(text: string): Promise<number[]> {
    console.log("Mock embedding for:", text);

    // Simple hash-based mock embedding for consistent results
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }

    // Create deterministic mock embedding based on text
    const embedding = Array(384).fill(0);
    for (let i = 0; i < 10; i++) {
      embedding[(hash + i) % 384] = 0.5 + (Math.abs(hash) % 100) / 200;
    }

    return embedding;
  }
}

export const embeddingService = new EmbeddingService();
