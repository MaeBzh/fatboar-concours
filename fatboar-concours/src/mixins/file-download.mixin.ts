import { Vue, Component } from "vue-property-decorator";

@Component
export default class FileDownloadMixin extends Vue {
  public getFileUrl(filename: string) {
    return `${process.env.VUE_APP_API_BASE_URL}/download/${filename}`;
  }
}
