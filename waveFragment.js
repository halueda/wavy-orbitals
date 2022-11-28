
export default class WaveFragment {
  constructor(x, y, z, init_theta, angular_velocity, parent=null, visible=true, ){
    this.x = x;
    this.y = y;
    this.z = z;
    this.init_theta = init_theta;
    this.angular_velocity = angular_velocity;
    this.parent = parent;
    this.visible = visible;
  }
  
}
