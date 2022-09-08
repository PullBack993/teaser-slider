import { mount, shallowMount,  } from "@vue/test-utils";
import CardList from "@/components/CardList.vue";

describe("CardList.vue", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = null;
    console.log("beforeEach executed!");
    wrapper = mount(CardList);
  });

  afterEach(() => {
    wrapper = null;
  })
  it("should test DATA() values (by app initialization)", () => {
    expect(wrapper.vm.isError).toBe(false);
    expect(wrapper.vm.isNextHidden).toBe(false);
    expect(wrapper.vm.isPrevHidden).toBe(true);
    expect(wrapper.vm.currentIndex).toBe(0);
    expect(wrapper.vm.totalIndex).toBe(0);
    expect(wrapper.vm.animals).toEqual([]);
    expect(wrapper.vm.touch.endX).toBe(0);
    expect(wrapper.vm.touch.startX).toBe(0);
  });

  it("Anchor tag 'Alle' should exist link to 'restplatzboerse.at' be there ", async () => {
    const link = wrapper.get(".card-link");

    expect(link.exists()).toBeTruthy();
    expect(wrapper.html()).toContain('href="https://www.restplatzboerse.at/"');
    expect(link.text()).toEqual("Alle");
  });

  it("should not show content until receive data", () => {
    expect(wrapper.html()).not.toContain('class="card-item"');
  });

  it("should show content after received data", async () => {
    await wrapper.setData({ animals: [{ name: "a" }] });

    expect(wrapper.html()).toContain('class="card-item"');
  });

  it("does not show the user error component", async () => {
    await wrapper.setData({ animals: [{ name: "a" }] });

    expect(wrapper.vm.isError).toBe(false);
    expect(wrapper.html()).not.toContain("error");
  });

  it("should show spinner before receiving data", () => {
    const spinner = wrapper.get("#spinner");
    expect(spinner.exists()).toBeTruthy();
  });

  it("should't show spinner before receiving data", async () => {
    await wrapper.setData({ animals: [{ name: "a" }] });
    expect(wrapper.vm.animals).toHaveLength(1);
    expect(wrapper.html()).not.toContain("#spinner");
  });

  it("should test computed properties 'listPostion'", async () => {
    expect(wrapper.vm.listPosition).toStrictEqual({
      "transform": "translateX(-0%)",
    });

    await wrapper.setData({ currentIndex: 1 });

    expect(wrapper.vm.listPosition).toStrictEqual({
      "transform": "translateX(-100%)",
    });
  });

  it("should show next button(arrow)", async () => {
    await wrapper.setData({animals: [{ name: "a" }]});

    expect(wrapper.html()).toContain("material-symbols-outlined next-btn");
  });

  it("should show preview button(arrow)", async () => {
    await wrapper.setData({
      animals: [{ name: "a" }],
      isPrevHidden: false,
    });

    expect(wrapper.html()).toContain("material-symbols-outlined prev-btn");
  });

  it("should test nextIndex method by click next button(arrow) ", async () => {
    await wrapper.setData({ animals: [{ name: "a" }] });

    const nextBtn = wrapper.get(".next-btn");
    const spy = jest.spyOn(wrapper.vm, "nextIndex");
    await nextBtn.trigger("click");

    expect(spy).toHaveBeenCalled();
  });

  it("should test prevIndex method by click preview button(arrow) ", async () => {
    await wrapper.setData({
      animals: [{ name: "a" }],
      currentIndex: 1,
      isPrevHidden: false,
      calculateLeftIndex: 1,
    });

    const prevBtn = wrapper.get(".prev-btn");
    const spy = jest.spyOn(wrapper.vm, "prevIndex");
    await prevBtn.trigger("click");

    expect(spy).toHaveBeenCalled();
  });

});
