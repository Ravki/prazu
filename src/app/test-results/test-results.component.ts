import { Component, OnInit } from '@angular/core';
import { RunTestsService } from '../run-tests.service';
import { UpdateNavbarService } from '../update-navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit {

    summaryChart: any = [];
    drillDownChart: any = []
    sample: any = {};
    passPerecent: string = '';


  constructor( private testsService: RunTestsService, private navBarService: UpdateNavbarService, private router: Router) { }

  ngOnInit() {
    this.navBarService.updateNavBar(false, '/results');
    this.summaryChart = this.testsService.chartData.summaryChart; 
    this.calculatePassPercent(this.summaryChart)
    this.sample = this.testsService.chartData.drillDownChart[0];
    this.drillDownChart = [{
        Module: this.sample['module'],
        Passed: parseInt(this.sample['testCasesPassed']),
        Failed: parseInt(this.sample['testCasesFailed']),
    }];

  }

  navigateToDashboard() {
      this.router.navigateByUrl('/form');
  }

    calculatePassPercent(arr) {
        let pass: number = 0;
        let fail: number = 0;

        if(arr[0].label == 'Pass') {
            pass = arr[0].value;
            fail = arr[1].value;
        }
        else {
            pass = arr[1].value;
            fail = arr[0].value;
        }
        this.passPerecent = ((pass/(pass+fail))*100).toFixed(1);

    }
  data_source_mobile: any = this.summaryChart;
	getWidth() : any {
		if (document.body.offsetWidth < 767) {
			return '90%';
		}
		return '100%';
	}
	
  legendLayout: any = { left: 320, top: 50, width: 300, height: 300, flow: 'vertical' };
  padding: any = { left: 5, top: 5, right: 5, bottom: 5 };
  titlePadding: any = { left: 5, top: 0, right: 0, bottom: 10 };
  seriesGroups: any[] = [
      {
          type: 'donut',
          offsetX: 150,
          series:
          [
              {
                  showLabels: false,
                  dataField: 'value',
                  displayText: 'label',
                  labelRadius: 120,
                  initialAngle: 90,
                  radius: 90,
                  innerRadius: 50,
                  centerOffset: 0
              }
          ]
      }
  ];

  sampleData: any[] = [
      { Module: 'Module1', Passed: 50, Failed: 15 }
  ];

  padding1: any = { left: 5, top: 5, right: 5, bottom: 5 };
  titlePadding1: any = { left: 90, top: 0, right: 0, bottom: 50 };
  xAxis: any =
  {
      dataField: 'Module',
      showGridLines: false
  };
  seriesGroups1: any[] =[
      {
          type: 'column',
          columnsGapPercent: 50,
          seriesGapPercent: 0,
          valueAxis: {
              unitInterval: 1,
              minValue: 0,
              maxValue: 10,
              displayValueAxis: true,
              description: 'Number of Test Cases',
              axisSize: 'auto',
              tickMarksColor: '#888888'
          },
          series: [
              { dataField: 'Passed', displayText: 'Passed' },
              { dataField: 'Failed', displayText: 'Failed' }
          ]
      }
  ];
}

