import {
  Component,
  EventEmitter,
  Output,
  SimpleChanges,
  output,
} from '@angular/core';
import { sample_tags } from '../../../../test-data/data';
import { Tag } from '../../../../test-data/Tag';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tags-bar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tags-bar.component.html',
  styleUrl: './tags-bar.component.css',
})
export class TagsBarComponent {
  tagsArray: Tag[] = [];
  // @Output() Tag = new EventEmitter<string>();
  tag = output<string>();
  selectedTag = 'All';
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tagsArray = sample_tags;
    console.log(this.tagsArray);
    this.tag.emit(this.tagsArray[0].name);
  }
  Selected(tagValue: any) {
    console.log(tagValue);
    this.selectedTag = tagValue;
    // this.Tag.emit(tagValue);
    // this.Tag = tagValue;
    // console.log(this.Tag);
    this.tag.emit(tagValue);
  }
}
