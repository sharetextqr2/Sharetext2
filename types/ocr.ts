export interface OcrSpaceWord {
  WordText: string;
  Left: number;
  Top: number;
  Height: number;
  Width: number;
}

export interface OcrSpaceLine {
  LineText: string;
  Words: OcrSpaceWord[];
  MaxHeight: number;
  MinTop: number;
}

export interface OcrSpaceParsedResult {
  TextOverlay: {
    Lines: OcrSpaceLine[];
    HasOverlay: boolean;
    Message: string;
  };
  TextOrientation: string;
  FileParseExitCode: number;
  ParsedText: string;
  ErrorMessage: string;
  ErrorDetails: string;
}

export interface OcrSpaceResponse {
  ParsedResults: OcrSpaceParsedResult[];
  OCRExitCode: number;
  IsErroredOnProcessing: boolean;
  ProcessingTimeInMilliseconds: string;
  SearchablePDFURL: string;
  ErrorMessage?: string;
  ErrorDetails?: string;
}

export interface OcrResult {
  text: string;
  formattedHtml: string;
  rawJson: string;
  confidence: number;
  orientation: string;
  processingTime: number;
}

export interface OcrProgress {
  stage: 'idle' | 'preparing' | 'uploading' | 'recognizing' | 'formatting' | 'done' | 'error';
  message: string;
}
