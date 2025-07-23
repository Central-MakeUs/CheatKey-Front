export interface UploadedImage {
  previewUrl: string;
  file: File;
}

export type CommunityWriteValidationError = {
  titleTooShort: boolean;
  contentTooShort: boolean;
  boardEmpty: boolean;
  imageTooLarge: boolean;
};
