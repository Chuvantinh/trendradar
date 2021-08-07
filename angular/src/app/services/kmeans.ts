import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Kmeans {
  constructor() {

  }

  kmeans(arrayToProcess: any, Clusters: any): Array {

    let Groups = new Array();
    let Centroids = new Array();
    let oldCentroids = new Array();
    let changed = false;

    let newGroup;

    // initialise group arrays
    for (let initGroups = 0; initGroups < Clusters; initGroups++) {

      Groups[initGroups] = new Array();

    }

    // pick initial centroids

    let initialCentroids = Math.round(arrayToProcess.length / (Clusters + 1));

    for (let i = 0; i < Clusters; i++) {

      Centroids[i] = arrayToProcess[(initialCentroids * (i + 1))];

    }

    do {

      for (let j = 0; j < Clusters; j++) {

        Groups[j] = [];

      }

      changed = false;

      for (let i = 0; i < arrayToProcess.length; i++) {

        let Distance = -1;
        let oldDistance = -1;


        for (let j = 0; j < Clusters; j++) {

          let distance = Math.abs(Centroids[j] - arrayToProcess[i]);

          if (oldDistance == -1) {

            oldDistance = distance;
            newGroup = j;

          } else if (distance <= oldDistance) {

            newGroup = j;
            oldDistance = distance;

          }

        }

        Groups[newGroup].push(arrayToProcess[i]);

      }

      oldCentroids = Centroids;

      for (let j = 0; j < Clusters; j++) {

        let total = 0;
        let newCentroid = 0;

        for (let i = 0; i < Groups[j].length; i++) {

          total += Groups[j][i];

        }

        newCentroid = total / Groups[newGroup].length;

        Centroids[j] = newCentroid;

      }

      for (let j = 0; j < Clusters; j++) {

        if (Centroids[j] != oldCentroids[j]) {

          changed = true;

        }

      }

    }
    while (changed == true);

    return Groups;

  }
}
