#include <iostream>
#include<algorithm>
using namespace std;
class Customer 
{
    string name;
    int acc_number;
    double balance;

    public:
    Customer()  
    {
        cout<<"Hello I am Default Constructor!"<<endl;
    }
    Customer(string n, int acc) : name(n), acc_number(acc), balance(0.0) {}
    Customer(string n, int acc, double bal) : name(n), acc_number(acc), balance(bal) {}
    void display() {
        cout << "Name: " << name << " | Account Number: " << acc_number << " | Balance: " << balance << endl;
    }
};

int main() {
    Customer c1;
    Customer c2("Alice", 1001);
    Customer c3("Bob", 1002, 5000.75);
    c1.display();
    c2.display();
    c3.display();
    return 0;
}