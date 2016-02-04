---
layout: post
title:  "程序员面试金典 chapter1 arrays and strings"
date:   2016-01-23 
categories: 学习
tags: 
     -学习
     -面试
     -C语言
---
### 第一题  翻转字符串
把一个给定的字符串反转
笨方法，遍历整个给定的string，将数组string[n]中的第i个元素与第[n-1-i]个元素对调，下面为代码示例：

{% highlight c %}
class Reverse {
public:
    string reverseString(string iniString) {
        // write code here
        char c;
        int len = iniString.length();
        for(int i=0; i < len / 2; i ++)
        {
         c = iniString[i];
            iniString[i] = iniString[len - i - 1];
            iniString[len - i - 1] = c;
        }
        return iniString;
    }
};
{% endhighlight c %}
### 第二题  判定字符串中字符是否相同或不同
...
不细说、代码示例在下面：

{% highlight c %}

class Different {
public:
    bool checkDifferent(string iniString) {
        // write code here
        for(int i=0;iniString[i]!='\0';i++)
            {
            for(int j=i+1;iniString[j]!='\0';j++){
                if(iniString[i] == iniString[j])
                    return 0;
            }
        }
            return 1;
    }
};
{% endhighlight c %}
### 第三题  确定两串乱序同构

(我觉得和第八题是一样的，这里是第八题的描述：
请将这个算法编写成一个函数，给定两个字符串s1和s2，请编写代码检查s2是否为s1旋转而成。唯一不一样的地方可能就是第八题要求用并且只用一次issubstring这个函数吧。这里省略第八题。
)

给出的代码结构为:

{% highlight c %}
class Same {
public:
    bool checkSam(string stringA, string stringB) {
        // write code here
};
{% endhighlight c %}
我的第一个想法很简单，遍历整个stringA和stringB，当在B中能找到该元素就在B数组中删除这个元素，直到最后判断B是否为空。但是....总之我这么想着写有误，会漏判应该返回 "false"的情况，下面为错误的代码示例：

{% highlight c %}
class Same {
public:
    bool checkSam(string stringA, string stringB) {
        // write code here
        if(stringA.length()!=stringB.length())
            return false;
       for(int i=0;stringA[i]!='\0';i++){
           for (int j=0;stringB[j]!='\0';j++){
               if(stringA[i] == stringB[j]){
                   stringB.erase(j,1);
               }
           }
       }
        stringB.erase('\0');  //delete the last element in the string
        if(stringB.empty())
            return true;
        return false;
    }
};
{% endhighlight c %}
既然漏判了一个原本应该为"false"的情况那么我就加判一个，同样遍历A，当不能在B中找到A的该元素时我就立即返回"false".一下为通过的代码示例：

{% highlight c %}
class Same {
public:
    bool checkSam(string stringA, string stringB) {
        // write code here
        if(stringA.length()!=stringB.length())
            return false;
       for(int i=0;stringA[i]!='\0';i++){
           for (int j=0;stringB[j]!='\0';j++){
               if(stringA[i] == stringB[j]){
                   stringB.erase(j,1);
                   break;
               }
               else if((stringA[i] != stringB[j]) && (j == stringB.length()-1))
                   return false;
           }
       }
        stringB.erase('\0');
        if(stringB.empty())
            return true;
        return false;
    }
};
{% endhighlight c %}
在看别人的讨论中看到大神们是这么想的，还是一样先从最简单的长度开始比较，然后定义一个存放了256个"0"的新数组，当在遍历的时候将A中的元素和B中的元素逐一进行记录，遇到A中的第n个元素该新定义的的数组的第[A[n]]个"0"自增1，而同样，遇到B的元素时自减1.也就是说若A和B是完全相同的组合数组那么意味着这个新定义的数组始终应该保持“0”的平衡。下面是该方法的代码示例：

{% highlight c %}

class Same {
public:
    bool checkSam(string stringA, string stringB) {
        // write code here
        char count[256]={0};
        if(stringA.size()!=stringB.size()) return false;
          
        for(int i=0;i<stringA.size();i++)
        {
            count[stringA[i]]++;
                count[stringB[i]]--;
        }
        for(int i=0;i<256;i++)
            if(count[i]!=0)
                return false;
        return true;
    }
};
{% endhighlight c %}
我自己的本方法虽然最后运行结果正确但是运行时间相当长，我的正确代码运行时间为70ms而大神的代码只需要1ms。

### 第四题 将字符串中的空格全部替换为"%20"
给出的代码格式为:

{% highlight c %}
class Replacement {
public:
    string replaceSpace(string iniString, int length) {
        // write code here
        
    }
};
{% endhighlight c %}
简单的想，首要任务应该就是找找这个字符串里面哪里有空格,哪里有空格就在哪里添加那个"%20"呗。简单的代码示例为：

{% highlight c %}

class Replacement {
public:
    string replaceSpace(string iniString, int length) {
        // write code here
        string str;
        for(int i=0;i<length;i++)
        {
            if(iniString[i]==' ')
            {
                str+="%20";
            }else
            {
                str+=iniString[i];
            }
        }
        return str;
    }
};
{% endhighlight c %}
### 第五题 压缩字符串
利用字符重复出现的次数，编写一个方法，实现基本的字符串压缩功能。比如，字符串“aabcccccaaa”经压缩会变成“a2b1c5a3”。若压缩后的字符串没有变短，则返回原先的字符串。

好吧，一开始没怎么明白看了好几遍输出才知道卧槽根本不存在压缩后面不带数字的情况啊。。。。思路很简单总之就是j的循环在i里面，期间犯了个很大错误导致最后一个元素会打印不出来，原因在于内循环的j也设了不能到字符串最后的条件，来看一下这个判断：

{% highlight c %}
for(int i=0;i<iniString.length();){
            for(j=i;j<iniString.length();){
                if(iniString[i] == iniString[j]){
                    count++;
                    j++;
                }
                else{
                       str+=iniString[i];
                       str+=to_string(count);
                    count=0;
                    break;
                }
            }
            i=j;
        }
{% endhighlight c %}
我估计之所以不能get到最后的元素可能是因为这样写的后果。。。j到不了字符串最后的'\0'，以至于最后比较的时候没办法"j++"。所以最终通过代码为：

{% highlight c %}
class Zipper {
public:
    string zipString(string iniString) {
        // write code here
        string str;
        int j=0;
        int count=0;
        for(int i=0;i<iniString.length();){
            for(j=i;;){
                if(iniString[i] == iniString[j]){
                    count++;
                    j++;
                }
                else{
                       str+=iniString[i];
                       str+=to_string(count);
                    count=0;
                    break;
                }
            }
            i=j;
        }
        
        if(str.length() >= iniString.length())
            return iniString;
        return str;
    }
};
{% endhighlight c %}
### 第六题 像素翻转
需要返回一个旋转后的NxN矩阵
函数样例给出如下：

{% highlight c %}
class Transform {
public:
    vector<vector<int> > transformImage(vector<vector<int> > mat, int n) {
        // write code here
    }
};
{% endhighlight c %}
既然不能定义一个新的temp数组可能从替换的角度来思考这个问题更简便一些，首先从矩阵最外围的一圈来看：

{% highlight c %}
for(int i=0;i<n/2;i++){
 //... ...
}
{% endhighlight c %}
假如说该原始矩阵有单数层那么理应只需要进行(n-1)/2次分层就可以了，比如三层，去掉最外围就只剩下中间的一个元素，应该不动。若是偶数层正好除尽，进行n/2次的处理。那么对于每一层来说有四条边，就在每一层中间做需要做四次的操作：

{% highlight c %}
for(int i=0;i<n/2;i++){
    for(int j=i;j<n-1-i;j++){
        mat[i][j]=mat[n-j-1][i];
  }
}
{% endhighlight c %}
第一次处理第一行的元素，变换后的矩阵第一行由第一列来取代，将内循环的j看作是列的话，那么挨个的元素替换就相当于是将该列最后一个元素[n-0-1][0]替换到了[0][0]的位置，而后以此类推。
第二次处理应该处理刚刚替换的位置的元素也就是第一列的元素，第一列的元素是被最后一行的元素锁替代，那么代码示例为：

{% highlight c %}
mat[n-j-1][i]=mat[n-i-1][n-j-1];
{% endhighlight c %}
也就是说第一列最后一个元素[n-0-1][0]被替换成了[n-0-1][n-0-1]也就是最后一行的最后一个元素了，以此类推。
继续第三次是把刚刚替换了第一列的元素，也就是原矩阵最后一行的元素进行处理，换成原矩阵的最后一列元素。最后将原矩阵第一行的元素放入原矩阵最后一列的元素，第一层就替换完毕了。
最后完整代码示例为：

{% highlight c %}
class Transform {
public:
    vector<vector<int> > transformImage(vector<vector<int> > mat, int n) {
    // write code here
    int temp;
    for(int i=0;i<n/2;i++){
      for(int j=i;j<n-1-i;j++){
          temp = mat[i][j];
          mat[i][j]=mat[n-j-1][i];
          mat[n-j-1][i]=mat[n-i-1][n-j-1];
          mat[n-i-1][n-j-1]=mat[j][n-i-1];
          mat[j][n-i-1]=temp;
      }
  }
    return mat;
    }
};
{% endhighlight c %}
### 第七题  清除矩阵中整行整列
还是遍历整个矩阵，也就是一个二维数组，找到0就返回flag该行该列都应该为0。那么返回的这个flag通过定义两个新的一维数组来实现简单的记录，通过代码示例为：

{% highlight c %}
class Clearer {
public:
    vector<vector<int> > clearZero(vector<vector<int> > mat, int n) {
        // write code here
        //vector<int> row(n,1),column(n,1);
        int row[n],column[n];
        for(int i=0;i<n;i++){
            row[i]=0;
            column[i]=0;
        }
        for(int i=0;i<n;i++){
            for(int j=0;j<n;j++){
                if(mat[i][j] == 0){
                    row[i]=1;
                    column[j]=1;
                }
            }
        }
        for(int i=0;i<n;i++){
            for(int j=0;j<n;j++){
                if(row[i]==1 || column[j]==1){
                    mat[i][j]=0;
                }
            }
        }
        return mat;
    }
};
{% endhighlight c %}