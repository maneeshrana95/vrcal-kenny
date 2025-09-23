import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.css'
})
export class FaqSectionComponent {
 faqs = [
    {
      question: 'When does the course start and finish?',
      answer: `The course starts now and never ends! It is a completely self-paced online course - you decide when you start and when you finish.`,
      open: false
    },
    {
      question: 'How long do I have access to the course?',
      answer: `How does lifetime access sound? After enrolling, you have unlimited access to this course for as long as you like - across any and all devices you own.`,
      open: false
    },
    {
      question: 'What if I am unhappy with the course?',
      answer: `We would never want you to be unhappy! If you are unsatisfied with your purchase, contact us in the first 7 days and we will give you a full refund.`,
      open: false
    },
    {
      question: 'New things scare me. Is this hard to use?',
      answer: `I am not very savvy with technology either. That is why I picked the most effortless platform use I could find. It only takes a few clicks...`,
      open: false
    },
    {
      question: 'I am swamped. How much time does this take?',
      answer: `All it takes is 15 minutes a day. Just watch one video and answer one question in the Journey books...`,
      open: false
    },
    {
      question: 'Which class should I start with?',
      answer: `Your Journey To Emotional Authenticity . Because it is the foundational piece to your success, I have included it for free in ALL masterclasses.`,
      open: false
    },
    {
      question: 'Will this Masterclass really work?',
      answer: `It has been my experience that every student who followed the process exactly as I have designed it has achieved their goals. No exceptions!`,
      open: false
    },
    {
      question: 'How long does it take to see results?',
      answer: `The feeling of progress, understanding, and accomplishment happens IMMEDIATELY for everyone! No exceptions.`,
      open: false
    }
  ];

  toggleFAQ(index: number) {
    this.faqs.forEach((faq, i) => {
      faq.open = i === index ? !faq.open : false;
    });
  }
}
