import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-stat',
  templateUrl: './blog-stat.component.html',
  styleUrls: ['./blog-stat.component.scss']
})
export class BlogStatComponent implements OnInit {
  data: any;
  options: any;

  data2: any;
  options2: any;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.blogService.getBlogs().subscribe((blogs: any[]) => {
      if (!blogs || blogs.length === 0) {
        console.log('No blogs found or error fetching blogs');
        return;
      }

      blogs.sort((a, b) => (b.comments || 0) - (a.comments || 0));

      console.log('Fetched blogs:', blogs);

      this.data = {
        labels: blogs.map(blog => blog.title),
        datasets: [
          {
            data: blogs.map(blog => blog.comments.length || 0),
            backgroundColor: [
              documentStyle.getPropertyValue('--blue-500'),
  documentStyle.getPropertyValue('--yellow-500'),
  documentStyle.getPropertyValue('--green-500'),
  documentStyle.getPropertyValue('--red-500'),
  documentStyle.getPropertyValue('--purple-500'),
  documentStyle.getPropertyValue('--grey-500'),
  documentStyle.getPropertyValue('--white-500'),
  documentStyle.getPropertyValue('--pink-700'),
  documentStyle.getPropertyValue('--black-500'),

  // Additional colors
  documentStyle.getPropertyValue('--orange-500'),
  documentStyle.getPropertyValue('--teal-500'),
  documentStyle.getPropertyValue('--cyan-500'),
  documentStyle.getPropertyValue('--lime-500'),
  documentStyle.getPropertyValue('--indigo-500'),
  documentStyle.getPropertyValue('--brown-500'),
  documentStyle.getPropertyValue('--amber-500'),
  documentStyle.getPropertyValue('--deep-orange-500'),
  documentStyle.getPropertyValue('--light-blue-500'),
  documentStyle.getPropertyValue('--deep-purple-500'),
  documentStyle.getPropertyValue('--light-green-500'),
  documentStyle.getPropertyValue('--blue-grey-500'),
  documentStyle.getPropertyValue('--dark-green-500'),
  documentStyle.getPropertyValue('--gold-500'),
  documentStyle.getPropertyValue('--silver-500'),
  documentStyle.getPropertyValue('--bronze-500')
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--green-500'),
              documentStyle.getPropertyValue('--red-500'),
              documentStyle.getPropertyValue('--purple-500'),
              documentStyle.getPropertyValue('--grey-500'),
              documentStyle.getPropertyValue('--white-500'),
              documentStyle.getPropertyValue('--pink-700'),
              documentStyle.getPropertyValue('--black-500'),
            
              // Additional colors
              documentStyle.getPropertyValue('--orange-500'),
              documentStyle.getPropertyValue('--teal-500'),
              documentStyle.getPropertyValue('--cyan-500'),
              documentStyle.getPropertyValue('--lime-500'),
              documentStyle.getPropertyValue('--indigo-500'),
              documentStyle.getPropertyValue('--brown-500'),
              documentStyle.getPropertyValue('--amber-500'),
              documentStyle.getPropertyValue('--deep-orange-500'),
              documentStyle.getPropertyValue('--light-blue-500'),
              documentStyle.getPropertyValue('--deep-purple-500'),
              documentStyle.getPropertyValue('--light-green-500'),
              documentStyle.getPropertyValue('--blue-grey-500'),
              documentStyle.getPropertyValue('--dark-green-500'),
              documentStyle.getPropertyValue('--gold-500'),
              documentStyle.getPropertyValue('--silver-500'),
              documentStyle.getPropertyValue('--bronze-500')
            ]
          }
        ]
      };

      console.log('Chart data:', this.data);

      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };

    // this.options = {
    //     plugins: {
    //         legend: {
    //             labels: {
    //                 usePointStyle: true,
    //                 color: textColor
    //             }
    //         }
    //     }
    // };

  //   this.data = {
  //     labels: blogs.map(blog => blog.title),
  //     datasets: [
  //         {
  //             data: [540, 325, 702],
  //             backgroundColor: [
  //                 documentStyle.getPropertyValue('--indigo-500'),
  //                 documentStyle.getPropertyValue('--purple-500'),
  //                 documentStyle.getPropertyValue('--teal-500')
  //             ],
  //             hoverBackgroundColor: [
  //                 documentStyle.getPropertyValue('--indigo-400'),
  //                 documentStyle.getPropertyValue('--purple-400'),
  //                 documentStyle.getPropertyValue('--teal-400')
  //             ]
  //         }]
  // };


    }, error => {
      console.error('Error fetching blogs:', error);
    });
  }
}
