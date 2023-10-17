import { DiscountCalculatorServiceInterface } from "./discount-calculator.interface";

export class DiscountCalculatorBy25DayService  implements DiscountCalculatorServiceInterface {
    calculate( total: number): number {
        throw new Error("Method not implemented.");
        
    if (new Date('now') === '25') {
        total = total - 10;
      }
      return total;
     
  
    }
    }
   
   
    


