import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend-graph',
  templateUrl: './friend-graph.component.html',
  styleUrls: ['./friend-graph.component.scss']
})
export class FriendGraphComponent implements OnInit {

  nodes = [];
  links = [];

  constructor(private userService: UserService, private router: Router) {}

  public ngOnInit() {
    this.showGraph();
  }

  showGraph() {
    if (this.router.url === '/dashboard') {
      this.userService.getSharedData().subscribe(res => {
        this.getNodesLinks(res);
      });
    } else {
      this.userService.getUsers().subscribe(res => {
        this.getNodesLinks(res);
      });
    }

  }

  private getNodesLinks(res) {
    const nodes = [];
    const links = [];
    const linkMap = {};
    const nodeMap = {};
    for (const i of res) {
      nodes.push({
        id: i.id + '',
        label: i.name
      });
      nodeMap[i.id] = true;
    }
    for (const k of res) {
      const currentNode = k;
      for (const j of currentNode.friends) {
        const friendNode = j + '';
        const myNode = currentNode.id + '';
        if (!linkMap[myNode + '-' + friendNode] && !linkMap[friendNode + '-' + myNode] && nodeMap[friendNode]) {
          links.push({
            source: myNode,
            target: friendNode,
          });
          linkMap[myNode + '-' + friendNode] = 1;
        }
      }
    }
    this.nodes = nodes;
    this.links = links;
  }




}
