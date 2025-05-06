export interface Steps {
  title: string;
  subtitle: string;
  steps: {
    upload: {
      title: string;
      description: string;
    };
    style: {
      title: string;
      description: string;
    };
    generate: {
      title: string;
      description: string;
    };
  };
}