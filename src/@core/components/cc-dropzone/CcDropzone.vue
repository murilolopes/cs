<template>
  <!--  Movendo a validação do input pra dentro do componente  -->
  <validation-provider
    ref="vDropzoneProvider"
    v-slot="{ errors }"
    :name="validationName"
    :rules="concatRules"
    :vid="validationId"
  >
    <div :class="{ 'cc-dropzone': !files.length, 'cc-dropzone-min-height': !fit }">
      <div
        :class="{ 'dropzone-container': !files.length }"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <input
          type="file"
          name="file"
          :value="innerValue"
          :id="'fileInput-' + componentInstanceId"
          class="hidden-input"
          @change="onChange"
          :ref="'fileInput-' + componentInstanceId"
          :accept="acceptFormats"
          :required="required"
          v-if="!files.length"
        />

        <label :for="'fileInput-' + componentInstanceId" class="file-label" v-if="!files.length">
          <h4 class="text-primary">{{ title }}</h4>
          <span>{{ subtitle }}</span>
        </label>

        <div class="preview-container" v-if="files.length">
          <div
            v-for="(file, index) in files"
            :key="index"
            class="d-flex flex-row justify-content-start align-items-center"
          >
            <b-badge variant="light-primary" class="mt-2">
              <feather-icon icon="PaperclipIcon" size="16" /> {{ truncatedFileName || 'Anexo' }}
            </b-badge>
            <feather-icon
              class="ml-1 mt-2"
              icon="Trash2Icon"
              size="16"
              @click="remove(files.indexOf(file))"
            />
          </div>
        </div>
        <div>
          <small class="text-danger">{{ errors[0] }}</small>
        </div>
      </div>
    </div>
  </validation-provider>
</template>

<script>
import { BBadge } from 'bootstrap-vue'
import { v4 as uuidv4 } from 'uuid'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'CCDropzone',
  components: {
    BBadge,
    ValidationProvider,
  },
  props: {
    title: {
      type: String,
      default: 'Arraste seu arquivo até aqui ou clique para procurar.',
    },
    subtitle: {
      type: String,
      default: 'Envie seu arquivo no formato XML.',
    },
    acceptFormats: {
      type: String,
      default: '.xml',
    },
    required: {
      type: Boolean,
      default: true,
    },
    convertToBase64: {
      type: Boolean,
      default: false,
    },
    fit: {
      type: Boolean,
      default: false,
    },
    validationName: { type: String, default: '' },
    validationId: { type: String, default: '' },
    standalone: Boolean, // opcao pra permitir o componente funcionar isoladamente
    rules: [String],
    value: null,
  },
  data() {
    return {
      isDragging: false,
      files: [],
      componentInstanceId: '',
      innerValue: '',
    }
  },
  created() {
    this.componentInstanceId = uuidv4()
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$props.value.url) this.files.push({ name: 'Anexo' })
    })
  },
  methods: {
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    async onChange(e) {
      try {
        e.preventDefault()
        this.files = [...this.$refs['fileInput-' + this.componentInstanceId].files]
        let result = this.files[0]

        if (this.convertToBase64) result = await this.toBase64(this.files[0])

        this.innerValue = result

        if (!this.standalone) await this.$refs.vDropzoneProvider.validate()
      } catch (error) {
        console.log(error)
      }
    },
    dragover(e) {
      e.preventDefault()
      this.isDragging = true
    },
    dragleave() {
      this.isDragging = false
    },
    async drop(e) {
      e.preventDefault()
      this.$refs['fileInput-' + this.componentInstanceId].files = e.dataTransfer.files
      await this.onChange(e)
      this.isDragging = false
    },
    remove(i) {
      this.files.splice(i, 1)
      this.innerValue = ''
    },
    addFile(file) {
      this.files = [file]
      this.innerValue = file
    },
    validateFileType(file) {
      let formats = this.acceptFormats.split(', ')

      let fileExtension = file.name.split('.').pop().toLowerCase()

      if (!formats.includes(`\.${fileExtension}`)) {
        this.hasFormatError = true
        this.$emit('input', '')
      } else {
        this.hasFormatError = false
        this.$emit('input', file)
      }
    },
  },
  computed: {
    truncatedFileName() {
      if (!this.files.length) return ''

      const name = this.files[0].name
      return name.length > 20 ? `${this.files[0].name.slice(0, 20)}...` : this.files[0].name
    },
    concatRules() {
      const formats = this.acceptFormats
        .split(', ')
        .map((f) => f.replace('.', ''))
        .join()

      return this.standalone ? '' : `${this.rules}|ext:${formats}`
    },
  },
  watch: {
    innerValue(val) {
      this.$emit('input', val)
      this.$emit('update:value', val)
      this.$emit('change', val)
      this.$emit('blur', val)
    },
  },
}
</script>

<style lang="scss">
.cc-dropzone {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
}

.cc-dropzone-min-height {
  min-height: 150px;
}

.dropzone-container {
  padding: 20px;
  border: 2px dashed #dae1e8;
  background-color: #eff4f6;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  display: block;
  cursor: pointer;
}

.preview-container {
}

.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
}

.preview-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
</style>
