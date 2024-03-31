import React, { ChangeEvent } from "react";

interface AppState {
  file: ExtendedFile | null;
  base64URL: string;
}

interface ExtendedFile extends File {
  base64?: string;
}

class ImageInput extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      file: null,
      base64URL: "",
    };
  }

  getBase64 = (file: ExtendedFile): Promise<string> => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result as string;
        resolve(baseURL);
      };
    });
  };

  handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      let { file } = this.state;
      file = e.target.files[0];

      this.getBase64(file)
        .then((result) => {
          if (file) {
            file.base64 = result;
          }
          this.setState({
            base64URL: result,
            file,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render(): JSX.Element {
    return (
      <div className="w-fit">
        <input
          className="w-fit"
          type="file"
          name="file"
          onChange={this.handleFileInputChange}
        />
      </div>
    );
  }
}

export default ImageInput;
