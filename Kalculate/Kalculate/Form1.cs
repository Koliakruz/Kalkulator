using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Kalculate
{
    public partial class Form1 : Form
    {
        Double value = 0;
        String operation = "";
        bool operation_pressed = false;
        public Form1()
        {
            InitializeComponent();
        }
        private void Button_Click(object sender, EventArgs e)
        {
            if ((rezult.Text == "0")||(operation_pressed))
                rezult.Clear();
            operation_pressed = false;

            Button b = (Button)sender;
            if(b.Text == ",")
            {
                if(!rezult.Text.Contains(","))
                    rezult.Text = rezult.Text + b.Text;
            }
            else
                rezult.Text = rezult.Text + b.Text;
        }

        private void Button17_Click(object sender, EventArgs e)
        {
            rezult.Text = "0";
        }

        private void operator_click(object sender, EventArgs e)
        {
            Button b = (Button)sender;
            if (value != 0)
            {
                equal.PerformClick();
                operation_pressed = true;
                operation = b.Text;
                equation.Text = value + " " + operation;
            }
            else
            {
                operation = b.Text;
                value = Double.Parse(rezult.Text);
                operation_pressed = true;
                equation.Text = value + " " + operation;
            }
        }

        private void Button10_Click(object sender, EventArgs e)
        {
            equation.Text = "";
            switch (operation)
            {
                case "+":
                    rezult.Text = (value + Double.Parse(rezult.Text)).ToString();
                    break;
                case "-":
                    rezult.Text = (value - Double.Parse(rezult.Text)).ToString();
                    break;
                case "*":
                    rezult.Text = (value * Double.Parse(rezult.Text)).ToString();
                    break;
                case "/":
                    rezult.Text = (value / Double.Parse(rezult.Text)).ToString();
                    break;
                default:
                    break;
            }
            value = Int32.Parse(rezult.Text);
            operation = "";
        }

        private void Button18_Click(object sender, EventArgs e)
        {
            rezult.Text = "0";
            value = 0;
            equation.Text = "";
        }

        private void Form1_KeyPress(object sender, KeyPressEventArgs e)
        {
            switch (e.KeyChar.ToString())
            {
                case "0":
                    zero.PerformClick();
                    break;
                case "1":
                    one.PerformClick();
                    break;
                case "2":
                    two.PerformClick();
                    break;
                case "3":
                    three.PerformClick();
                    break;
                case "4":
                    four.PerformClick();
                    break;
                case "5":
                    five.PerformClick();
                    break;
                case "6":
                    six.PerformClick();
                    break;
                case "7":
                    seven.PerformClick();
                    break;
                case "8":
                    eight.PerformClick();
                    break;
                case "9":
                    nine.PerformClick();
                    break;
                case "+":
                    add.PerformClick();
                    break;
                case "-":
                    sub.PerformClick();
                    break;
                case "*":
                    times.PerformClick();
                    break;
                case "/":
                    dive.PerformClick();
                    break;
                case "=":
                    equal.PerformClick();
                    break;
                default:
                    break;
            }
        }
    }
}