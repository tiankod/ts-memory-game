/**
 * Debug is a Decorator function for a method
 * use with @Debug() behind a method
 * remark : don't work with a get/set method
 */
export default function Debug(): any {
    // Return our high-order function
    return (_target: any, methodName: string, descriptor: any) => {
      // Keep the method store in a local variable
      const originalMethod = descriptor.value;

      // Redefine the method value with our own
      descriptor.value = function(...args: any[]) {
        // Execute the method with its initial context and arguments
        const returnValue = originalMethod.apply(this, args);
        // write debug info in console
        console.log(`**** DEBUG ${this.constructor.name}.${methodName} ****`);
        console.log(this);
        console.log("args=["+ args.join(",")+"]");
        if (returnValue!== undefined) {
          console.log("return=");
          console.log(returnValue);
        } else
        {
          console.log(`return=void`);
        }
        // Return value
        return returnValue;
      };

      // Return the descriptor with the altered value
      return descriptor;
    };
  }
