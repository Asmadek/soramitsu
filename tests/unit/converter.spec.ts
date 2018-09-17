import { shallowMount } from "@vue/test-utils";
import Converter from "@/components/Converter.vue";

describe("Converter.vue", () => {
  it("Renver conponent", () => {
    const converter = shallowMount(Converter);
    expect(converter.contains("h1")).toEqual(true);
  });
});
