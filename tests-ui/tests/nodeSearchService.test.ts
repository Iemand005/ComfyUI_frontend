import { NodeSearchService } from "@/services/nodeSearchService";
import { ComfyNodeDef } from "@/types/apiTypes";

const EXAMPLE_NODE_DEFS: ComfyNodeDef[] = [
  {
    input: {
      required: {
        ckpt_name: [["model1.safetensors", "model2.ckpt"]],
      },
    },
    output: ["MODEL", "CLIP", "VAE"],
    output_is_list: [false, false, false],
    output_name: ["MODEL", "CLIP", "VAE"],
    name: "CheckpointLoaderSimple",
    display_name: "Load Checkpoint",
    description: "",
    python_module: "nodes",
    category: "loaders",
    output_node: false,
  },
  {
    input: {
      required: {
        samples: ["LATENT"],
        batch_index: [
          "INT",
          {
            default: 0,
            min: 0,
            max: 63,
          },
        ],
        length: [
          "INT",
          {
            default: 1,
            min: 1,
            max: 64,
          },
        ],
      },
    },
    output: ["LATENT"],
    output_is_list: [false],
    output_name: ["LATENT"],
    name: "LatentFromBatch",
    display_name: "Latent From Batch",
    description: "",
    python_module: "nodes",
    category: "latent/batch",
    output_node: false,
  },
];

describe("nodeSearchService", () => {
  it("searches with input filter", () => {
    const service = new NodeSearchService(EXAMPLE_NODE_DEFS);
    const inputFilter = service.getFilterById("input");
    expect(service.searchNode("L", [[inputFilter, "LATENT"]])).toHaveLength(1);
    expect(service.searchNode("L")).toHaveLength(2);
  });
});