import { mount, shallowMount } from '@vue/test-utils'
import CCDropzone from '@core/components/cc-dropzone/CcDropzone.vue'

describe('CCDropzone.vue', () => {
  it("should render correctly", () => {
    const wrapper = shallowMount(CCDropzone);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Should', () => {
    const { vm } = mount(CCDropzone)

    expect(vm.isDragging).toEqual(false)
    expect(vm.files).toEqual([])
    expect(vm.hasFormatError).toEqual(false)
  })
})
