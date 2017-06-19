{{P(file)}}

{{P(file).replace("package","import").replace(".vo",".vo.base."+U(data.table)+"BaseVO" )}}

public class {{U(data.table)}}VO extends {{U(data.table)}}BaseVO{
    private static final long serialVersionUID = 1L;
}
