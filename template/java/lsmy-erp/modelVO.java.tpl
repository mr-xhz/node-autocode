{{P(file)}}

import org.lsmy.cloud.common.bean.BaseBean;

{{I(data.fields)}}

public class {{U(data.table)}}VO extends BaseBean
{
  private static final long serialVersionUID = 1L;

  {{each data.fields as field}}
  /** {{field.Comment}} */
  private {{field.JavaType.type}} {{field.Field}};

  {{/each}}

  {{each data.fields as field}}
  /////////////////////////////////////////////////////////////////////////////
  // {{field.Field}} getter and setter
  /////////////////////////////////////////////////////////////////////////////
  public void set{{FU(field.Field)}}({{field.JavaType.type}} {{field.Field}}){
    this.{{field.Field}} = {{field.Field}};
  }
  public {{field.JavaType.type}} get{{FU(field.Field)}}(){
    return this.{{field.Field}};
  }
  {{/each}}
}
