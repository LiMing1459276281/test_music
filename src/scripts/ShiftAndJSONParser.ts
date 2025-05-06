
class ShiftAndJSONParser {
  private buffer: string = '';

  constructor() {}

  /**
   * Processes streaming data and returns complete JSON objects
   * @param dataStream The stream of data chunks
   * @returns An asynchronous iterator yielding parsed JSON objects
   */
  public async *processStreamingData(dataStream: AsyncIterableIterator<string>): AsyncIterableIterator<any> {

    for await (const chunk of dataStream) {
      this.buffer += chunk;

      let completeJSONIndex: number | null = null;
      while ((completeJSONIndex = this.findJSONEnd(this.buffer)) !== null) {
        const completeJSON = this.buffer.substring(0, completeJSONIndex + 1);
        this.buffer = this.buffer.substring(completeJSONIndex + 1); // Remove parsed JSON

        //console.log('Parsing JSON:', completeJSON);
        try {
          const parsedJSON = JSON.parse(completeJSON);
          yield parsedJSON; // Yield parsed JSON object
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    }
  }

  private findJSONEnd(buffer: string): number | null {
    const stack = [];
    for (let i = 0; i < buffer.length; i++) {
      const char = buffer[i];
      if (char === '{' || char === '[') {
        stack.push(char); 
      } else if (char === '}' && stack.length > 0 && stack[stack.length - 1] === '{') {
        stack.pop(); 
      } else if (char === ']' && stack.length > 0 && stack[stack.length - 1] === '[') {
        stack.pop(); 
      }
      if (stack.length === 0) {
        return i; 
      }
    }
    return null; 
  }
}

export default ShiftAndJSONParser;