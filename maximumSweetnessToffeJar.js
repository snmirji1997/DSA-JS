/* Maximum Sweetness of Toffee Jar
You are given an integer ( n ), an array of positive integers price where price[i] denotes the price of the ( i )-th toffee, and a positive integer ( k ).

The store sells jars of ( k ) distinct toffees. The sweetness of a toffee jar is the smallest absolute difference of the prices of any two toffees in the jar.

Return the maximum sweetness of a toffee jar.

Input Format:

The first line contains a single integer ( n ), the size of the price array.
The second line contains the price array, denoting the price of the ( i )-th toffee.
The third line contains a single integer ( k ), denoting the number of distinct toffees in each jar.
Output Format:

Print a single integer denoting the maximum possible sweetness.
Sample Input 1:

6
13 5 1 8 21 2
3
Sample Output 1:

8
Explanation:

Choosing the toffees with the prices [13, 5, 21]. The sweetness of the toffee jar is: 
min(|13 - 5|, |13 - 21|, |5 - 21|) = min(8, 8, 16) = 8 
It can be proven that 8 is the maximum sweetness that can be achieved.
Sample Input 2:

3
1 3 1
2
Sample Output 2:

2
Explanation::

Choose the toffees with the prices [1, 3]. The sweetness of the toffee jar is:
min(|1 - 3|) = min(2) = 2 
It can be proven that 2 is the maximum sweetness that can be achieved.
Constraints:

( 2 <= k <= n <= 10^5 )
( 1 <=price[i] <= 10^9 )
Note: The function should return the result. */

class Solution {
    maximumSweetness(n, price, k) {
      // Step 1: Sort the price array
      price.sort((a, b) => a - b);
  
      // Binary search range
      let left = 0;
      let right = price[n - 1] - price[0];
      let ans = 0;
  
      // Helper function to check if we can pick k toffees with at least 'mid' difference
      const canPick = (mid) => {
        let count = 1;
        let prev = price[0];
  
        for (let i = 1; i < n; i++) {
          if (price[i] - prev >= mid) {
            count++;
            prev = price[i];
            if (count >= k) return true;
          }
        }
        return false;
      };
  
      // Binary search to maximize the minimum difference
      while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (canPick(mid)) {
          ans = mid;
          left = mid + 1; // Try to increase the difference
        } else {
          right = mid - 1; // Decrease the difference
        }
      }
  
      return ans;
    }
  }
  
  // Example Usage
  let solution = new Solution();
  console.log(solution.maximumSweetness(6, [13, 5, 1, 8, 21, 2], 3)); // Output: 8
  console.log(solution.maximumSweetness(3, [1, 3, 1], 2)); // Output: 2