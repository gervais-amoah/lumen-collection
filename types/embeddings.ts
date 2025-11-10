export interface EmbeddingPipeline {
  (text: string, options: { pooling: string; normalize: boolean }): Promise<{
    data: Float32Array | Float64Array;
  }>;
}
