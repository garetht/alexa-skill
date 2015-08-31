import AlexaSkill from '../../lib';

/*
These are minimal implementations of the abstract
AlexaSkill class.
 */

export class LaunchableSkill extends AlexaSkill {
  onLaunchEvent() {}
}

export class ColorisSkill extends LaunchableSkill {
  handleMyColorIsIntent() {}
}
